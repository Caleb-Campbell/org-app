import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Layout from "~/components/layout";
import { api } from "~/utils/api";
import Image from "next/image"
import { Button } from "~/components/buttons";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favico.ico" />
      </Head>
       <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col gap-10">
          <Image src="/crow-at-comp.png" width={400} height={400} alt="crow at computer" className="max-w-sm rounded-lg shadow-2xl" />
          <div className="flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">Improve the Quality of Your Code</h1>
            <p className="py-6 text-center">{`Improving Code Quality is hard work. But you're a hard worker`}</p>
            <Button className={"mx-auto"} props={undefined}>Get Started</Button>
          </div>
        </div>
      </div>
      </div>
       </Layout>
    </>
  );
};

export default Home;
