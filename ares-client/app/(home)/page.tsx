import { useFetch } from "@/hooks/fetch";
import { Layout } from "@/component/aresLayout";

const Home = () => {
  const data = useFetch("http://localhost:8190/api/users");
  console.log("data", data);
  console.log("haha");
  return (
    <Layout>
      <div>home</div>
    </Layout>
  );
};

export default Home;
