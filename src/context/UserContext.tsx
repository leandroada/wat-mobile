import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { API_BASE_URL } from '@env';
import { useAuth } from './AuthContext'; // <-- Import Auth Context
import { useToast } from 'react-native-toast-notifications';

type User = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  phone?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (imageUri: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth(); // <-- Get token from AuthContext
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  /** GET /api/user/profile */
  const fetchUserProfile = async () => {
    if (!token) return; // No token, skip API call

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      

      setUser(response.data.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.show('Failed to fetch profile.', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  /** PUT /api/user/profile */
  const updateUserProfile = async (data: Partial<User>) => {
    if (!token) return;
    console.log(data, 'userData');

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/api/user/profile`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(response.data.user);
      console.log(response.data.user);
      
      toast.show('Profile updated successfully.', { type: 'success' });
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.show('Username already exists.', { type: 'danger' });
      } else {
        toast.show('Failed to update profile.', { type: 'danger' });
      }
      console.error('Update Profile Error:', error);
    } finally {
      setLoading(false);
    }
  };

  /** POST /api/user/avatar */
  const uploadAvatar = async (imageUri: string) => {
    if (!token || !imageUri) return;

    const formData = new FormData();
    if (imageUri) {
      // Extract the file extension (e.g., jpg, jpeg, png)
      const extension = imageUri.split('.').pop()?.toLowerCase();
      const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg'; // Default to jpeg

      formData.append('avatar', {
        uri: imageUri,
        name: `avatar.${extension || 'jpg'}`,
        type: mimeType,
      } as any);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/user/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response, 'avatar response');

      setUser(response.data.user);
      toast.show('Avatar uploaded successfully.', { type: 'success' });
    } catch (error) {
      console.error('Avatar Upload Error:', error);
      toast.show('Failed to upload avatar.', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        fetchUserProfile,
        updateUserProfile,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
