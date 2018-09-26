import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { grey, white, orangeLight } from '../utils/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class DeckRow extends PureComponent {

  state = {
    bgColor: new Animated.Value(0),
  }

  handleOnPress = () => {
    const { title, onClick } = this.props;
    const { bgColor } = this.state;

    Animated.sequence([
      Animated.timing(bgColor, {
          duration: 200,
          toValue: 1,
      }),
      Animated.timing(bgColor, {
          duration: 200,
          toValue: 0,
      }),
    ]).start(() => {
      onClick(title);
    });
  }

  render() {
    const { title, num } = this.props;
    const { bgColor, bounceValue } = this.state;

    const backgroundColor = bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [white, orangeLight],
    });

    return (
      <AnimatedTouchable
        style={[styles.row, {backgroundColor}]}
        onPress={this.handleOnPress}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{num} cards</Text>
        </View>
      </AnimatedTouchable>
    );
  }
}

DeckRow.defaultProps = {
  title: '-',
  num: 0,
  onClick: () => null,
};

DeckRow.propTypes = {
  title: PropTypes.string,
  num: PropTypes.number, 
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "transparent"
  },
  title: {
    fontSize: 20,
  },
  cards: {
    fontSize: 17,
    color: grey,
  }
});

export default DeckRow;