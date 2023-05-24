import { Box, Button, Circle, keyframes } from '@chakra-ui/react'
import { useRef, useState } from 'react'

const shake = keyframes`
  25% {transform:translateX(6px);}
  50% {transform:translateX(-4px);}
  75% {transform:translateX(2px);}
  100% {transform:translateX(0);}
`;

export default function Home() {
  const shakeAnimation = `${shake} .4s ease-in-out forwards`;
  const [animation, setAnimation] = useState<any>();
  const [circlePosition, setCirclePosition] = useState<any>();
  const boxRef = useRef(null);

  const handleClick = (event) => {
    const { clientX, clientY } = event;
    const newCircle = { x: clientX, y: clientY };

    const boxElement: any = boxRef.current;
    if (boxElement) {
      const { top, left } = boxElement.getBoundingClientRect();
      const newPosition = { x: left, y: top };
      setTimeout(() => {
        setCirclePosition(newPosition);
      }, 100);
    }
    setCirclePosition(newCircle);
  };

  return (
    <Box w='100vw' h='100vh'>
      <Box ref={boxRef} animation={animation} onAnimationEnd={() => setAnimation(undefined)}
        bg='tomato' w='100px' h='75px' m={5} p={4} color='white' borderRadius='10px'
      >List Box</Box>
      <Button 
        w='150px' position='absolute' top='50%' left='50%' colorScheme='blue'
        onClick={handleClick}
      >Add To List</Button>
      { circlePosition && 
        <Circle 
          zIndex={-1}
          top={circlePosition.y} left={circlePosition.x} position='absolute' size='15px' bg='tomato' color='white' 
          transition={'all .8s ease-in-out'}
          transitionTimingFunction={'cubic-bezier(1.000,0.440,0.840,0.500)'}
          onTransitionEnd={() => {
            setCirclePosition(undefined);
            setAnimation(shakeAnimation);
          }}
        />
      }
    </Box>
  )
}
