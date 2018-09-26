import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { orange, white } from '../utils/colors';

function SubmitBtn({ onPress, disabled, text, bgColor, textColor }) {
  return (
    <TouchableOpacity
      style={[
        styles.submitBtn,
        disabled ? styles.disabledBtn : styles.enabledBtn,
        {
          backgroundColor: bgColor
        }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Text
        style={[
          styles.submitBtnText,
          {
            color: textColor
          }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

SubmitBtn.defaultProps = {
  disabled: false,
  text: 'Submit',
  bgColor: orange,
  textColor: white
};

SubmitBtn.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: orange,
    padding: 10,
    width: 180,
    height: 45,
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledBtn: {
    opacity: 0.4
  },
  enabledBtn: {
    opacity: 1
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default SubmitBtn;
