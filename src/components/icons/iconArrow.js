import React, {useEffect, useState} from 'react';
import {Animated, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDown} from '../../assets';

const IconArrow = ({data}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [arrow, setArrow] = useState(false);
  console.log('Ini data props', data);

  useEffect(() => {
    if (data) {
      startAnimation();
    } else {
      endAnimation();
    }
  }, []);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const endAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedStyle = {
    transform: [{rotate: rotateInterpolate}],
  };

  return (
    <TouchableOpacity>
      <Animated.Image
        source={ArrowDown}
        style={[
          {
            height: 15,
            width: 15,
            marginLeft: 10,
            transform: arrow ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
          },
          animatedStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default IconArrow;
