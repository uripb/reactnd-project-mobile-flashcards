import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { orange, white } from '../utils/colors';

function SecondaryBtn({ onPress, disabled, text }) {
  return (
    <TouchableOpacity
      style={[
        styles.secondaryBtn,
        disabled ? styles.disabledBtn : styles.enabledBtn
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Text style={styles.secondaryBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

SecondaryBtn.defaultProps = {
  disabled: false,
  text: 'Submit'
};

SecondaryBtn.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  secondaryBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: orange,
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
  secondaryBtnText: {
    color: orange,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default SecondaryBtn;
