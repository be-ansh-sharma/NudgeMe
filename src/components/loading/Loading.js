import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';

export default function Loading() {
  const animationRef = useRef();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <LottieView
      ref={animationRef}
      source={require('../../assets/animations/loading.json')}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
