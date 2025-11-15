import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
    <Link href="./Home">go to Home page</Link><br></br>
    <Link href="./Auth/Signup">go to signup page</Link><br></br>
    <Link href="./Auth/Signin">go to signin page</Link>
   </div>
  );
}
