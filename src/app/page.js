import Image from "next/image";
import Signup from "./Auth/Signup/page";
import Signin from "./Auth/Signin/page";

export default function Home() {
  return (
    <div className="">
      <Signin/>
      <Signup/>
    </div>
  );
}
