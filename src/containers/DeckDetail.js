import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { AppLoading } from 'expo';
import { getDeck } from '../utils/api';

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deckId,
  };
};

/*const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    goBack: () => navigation.goBack(),
  };
};*/

class DeckDetail extends PureComponent {
  state = {
    ready: false,
    deck: null,
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    }
  }

  componentDidMount() {
    const { deckId } = this.props;
    getDeck(deckId)
      .then((deck) => {
        console.log(deck);
        this.setState({
          ready: true,
          deck,
        });
      });
  };

  renderLoading = () => (
    <AppLoading />
  );

  render() {
    const { ready, deck } = this.state;

    if (ready === false) {
      return this.renderLoading();
    }

    return (
      <View>
        <Text>{deck.title}</Text>
      </View>
    );

  }
}

DeckDetail.propTypes = {
  deckId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(DeckDetail);