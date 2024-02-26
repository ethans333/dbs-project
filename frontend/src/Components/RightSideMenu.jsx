export default function (props) {
  return (
    <div className="bg-white z-20 w-96 h-screen absolute top-0 right-0 shadow-lg">
      {props.children}
    </div>
  );
}
