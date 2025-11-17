import * as fp from "fingerpose";

export const numberOneGesture = (numberOneGesture: fp.GestureDescription) => {
  numberOneGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  numberOneGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.VerticalUp,
    1.0
  );

  numberOneGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  numberOneGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

  for (const finger of [
    fp.Finger.Thumb,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    numberOneGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    numberOneGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
  }
};

export const numberTwoGesture = (numberTwoGesture: fp.GestureDescription) => {
  numberTwoGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  numberTwoGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.VerticalUp,
    1.0
  );
  numberTwoGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
  numberTwoGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.VerticalUp,
    1.0
  );

  numberTwoGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  numberTwoGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

  numberTwoGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );

  numberTwoGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

  for (const finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    numberTwoGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    numberTwoGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
  }
};

export const numberThreeGesture = (
  numberThreeGesture: fp.GestureDescription
) => {
  numberThreeGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  numberThreeGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.VerticalUp,
    1.0
  );
  numberThreeGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
  numberThreeGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.VerticalUp,
    1.0
  );
  numberThreeGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);
  numberThreeGesture.addDirection(
    fp.Finger.Ring,
    fp.FingerDirection.VerticalUp,
    1.0
  );

  numberThreeGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  numberThreeGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

  numberThreeGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );

  numberThreeGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

  numberThreeGesture.addDirection(
    fp.Finger.Ring,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );

  numberThreeGesture.addDirection(
    fp.Finger.Ring,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

  for (const finger of [fp.Finger.Thumb, fp.Finger.Pinky]) {
    numberThreeGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    numberThreeGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }
};

export const gestureGenerator = () => {
  const oneGesture = new fp.GestureDescription("numberOne");
  const twoGesture = new fp.GestureDescription("numberTwo");
  const threeGesture = new fp.GestureDescription("numberThree");
  numberOneGesture(oneGesture);
  numberTwoGesture(twoGesture);
  numberThreeGesture(threeGesture);

  return [oneGesture, twoGesture, threeGesture];
};
