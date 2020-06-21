import React from 'react';

const SwipeBlockInnerScroll = (props) => {
    const container = React.createRef<HTMLDivElement>();
    const isolateTouch = (e) => {
      e.stopPropagation();
    }
   React.useEffect(()=>{
      const containerNode : any = container.current;
  
      if (!containerNode) {
        return;
      }
      containerNode.addEventListener("touchstart", isolateTouch, {
        passive: true,
      });
      containerNode.addEventListener("touchmove", isolateTouch, {
        passive: true,
      });
      containerNode.addEventListener("touchend", isolateTouch, {
        passive: true,
      });
      return ()=>{
      containerNode.removeEventListener("touchstart", isolateTouch, {
        passive: true,
      });
      containerNode.removeEventListener("touchmove", isolateTouch, {
        passive: true,
      });
      containerNode.removeEventListener("touchend", isolateTouch, {
        passive: true,
      });
      }
   },[container]);
  
      return <div ref={container}>{props.children}</div>;
  }

  export default SwipeBlockInnerScroll;