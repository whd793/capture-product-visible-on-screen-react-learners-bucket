import "./styles.css";
import { useRef, useEffect, useState } from "react";

export default function App() {
  let products = [];

  for (let i = 0; i < 20; i++) {
    products.push(<Element i={i + 1} />);
  }

  return <div className="wrapper">{products.map((n) => n)}</div>;
}

const Element = ({ i }) => {
  const ref = useRef();

  const isIntersecting = useOnScreen(ref);

  if (isIntersecting) {
    console.log(i);
  }

  return (
    <div ref={ref} className="block">
      {i}
    </div>
  );
};

const useOnScreen = (ref) => {
  const [intersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting);
    },
    { threshold: 1.0 }
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return intersecting;
};
