import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/Banner/Products/Products";
import Test from "@/components/Test/Test";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session =await getServerSession(authOptions);
  return (
    <div className="px-4 py-6  ">
      <Test></Test>
      <p>{ JSON.stringify(session) }</p>
      <Banner></Banner>
      <Products></Products>
    </div>
  );
}
