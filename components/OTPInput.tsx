import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string;
  onChangeText: (otp: string) => void;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  focusedInputStyle?: TextStyle;
  errorStyle?: TextStyle;
  hasError?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = '',
  onChangeText,
  onComplete,
  autoFocus = true,
  disabled = false,
  containerStyle,
  inputStyle,
  focusedInputStyle,
  errorStyle,
  hasError = false,
  secureTextEntry = false,
  placeholder = '',
  keyboardType = 'number-pad',
}) => {
  const [focusedIndex, setFocusedIndex] = useState(autoFocus ? 0 : -1);
  const [otpArray, setOtpArray] = useState<string[]>(() => {
    const array = value.split('').slice(0, length);
    return [...array, ...Array(length - array.length).fill('')];
  });

  const inputRefs = useRef<TextInput[]>([]);

  // Update otpArray when value prop changes
  useEffect(() => {
    const array = value.split('').slice(0, length);
    const newArray = [...array, ...Array(length - array.length).fill('')];
    setOtpArray(newArray);
  }, [value, length]);

  // Focus management
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChangeText = (text: string, index: number) => {
    if (disabled) return;

    // Handle paste operation
    if (text.length > 1) {
      const pastedText = text.slice(0, length);
      const newArray = pastedText.split('');
      const paddedArray = [...newArray, ...Array(length - newArray.length).fill('')];
      
      setOtpArray(paddedArray);
      const newOtp = paddedArray.join('');
      onChangeText(newOtp);
      
      // Focus on the next empty field or the last field
      const nextIndex = Math.min(pastedText.length, length - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
        setFocusedIndex(nextIndex);
      }
      
      // Check if OTP is complete
      if (pastedText.length === length && onComplete) {
        onComplete(newOtp);
      }
      return;
    }

    // Handle single character input
    const newArray = [...otpArray];
    newArray[index] = text;
    setOtpArray(newArray);
    
    const newOtp = newArray.join('');
    onChangeText(newOtp);

    // Move to next field if current field is filled
    if (text && index < length - 1) {
      const nextIndex = index + 1;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
        setFocusedIndex(nextIndex);
      }
    }

    // Check if OTP is complete
    if (newOtp.length === length && onComplete) {
      onComplete(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (disabled) return;

    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      if (!otpArray[index] && index > 0) {
        // Move to previous field if current is empty
        const prevIndex = index - 1;
        if (inputRefs.current[prevIndex]) {
          inputRefs.current[prevIndex].focus();
          setFocusedIndex(prevIndex);
        }
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const getInputStyle = (index: number): TextStyle => {
    const baseStyle = [styles.input, inputStyle];
    
    if (hasError) {
      baseStyle.push(styles.errorInput, errorStyle);
    } else if (focusedIndex === index) {
      baseStyle.push(styles.focusedInput, focusedInputStyle);
    }
    
    return StyleSheet.flatten(baseStyle);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={getInputStyle(index)}
          value={otpArray[index]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          maxLength={length} // Allow paste operation
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          editable={!disabled}
          selectTextOnFocus
          textAlign="center"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  focusedInput: {
    borderColor: '#00BFA5',
    backgroundColor: '#F0FFF4',
  },
  errorInput: {
    borderColor: '#FF5722',
    backgroundColor: '#FFF5F5',
  },
});

export default OTPInput;