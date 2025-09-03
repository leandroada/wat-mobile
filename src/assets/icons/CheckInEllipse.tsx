import React from 'react';
import { Text, View } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

interface Props {
  width?: number;
  height?: number;
  checked?: boolean;
}

const CheckInEllipse: React.FC<Props> = ({ width = responsiveHeight(2), height = responsiveHeight(2), checked = false }) => {
  return (
    <View
      className="rounded-full items-center justify-center"
      style={{
        width,
        height,
        backgroundColor: checked ? '#00D532' : '#ccc',
      }}
    >
     
        <Text
          className="text-white font-bold"
          style={{
        fontSize: responsiveFontSize(1.8),
        marginTop: -responsiveFontSize(.8),
        marginLeft: responsiveFontSize(.3),
          }}
        >
          ✓
        </Text>
      
    </View>
  );
};

export default CheckInEllipse;
