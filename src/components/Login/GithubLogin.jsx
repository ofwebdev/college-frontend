import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { SiGithub } from "react-icons/si";
import { Button, Center, Text } from "@chakra-ui/react";

const GithubLogin = ({ login }) => {
  const { signInWithGitHub } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLog = () => {
    signInWithGitHub().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <Button
      onClick={handleGoogleLog}
      w={"full"}
      // colorScheme={"facebook"}
      variant={"outline"}
      leftIcon={<SiGithub />}
    >
      <Center>
        <Text>Continue with GitHub</Text>
      </Center>
    </Button>
  );
};

export default GithubLogin;
