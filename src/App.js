import { useEffect, useState, useRef } from "react";
import { Box, Button, Input, Container, HStack, VStack, Img } from "@chakra-ui/react";
import Message from "./Components/Message";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./firebase.js";
import { getFirestore, addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";
import logo from "./Components/whatsapplogo.png"

const auth = getAuth(app);
const db = getFirestore(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      alert(error);
    }
    divForScroll.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);
  
  return (
    <Box bg={"pink.100"} >
      {user ? (
        
        <Container h={"100vh"} w={'70h'} bg={"red.100"}>
         

          <VStack h={"full"} paddingY={"4"}>
            
            <Button onClick={logoutHandler} w={"full"} colorScheme={"pink"}>
              Logout
            </Button>

            <VStack bg={"red.200"} h={"full"} w={"full"} overflowY={"auto"} padding={"2"} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
              {messages.map((item) => (
                <Message key={item.id} user={item.uid === user.uid ? "other" : "me"} text={item.text} uri={item.uri} />
              ))}
              <div ref={divForScroll}></div>
            </VStack>

            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <HStack>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} w={"full"} bg={"white"} placeholder="Message..." />
                <Button type="submit" colorScheme="pink">
                  SEND
                </Button>
              </HStack>
            </form>
          </VStack>

        </Container>
      ) : (
      
       <>
      <Box style={{fontSize:'30px', display:'flex', justifyContent:'center', alignItems:'center'}} bg="black"  textColor={'white'}>
       
         <img src= {logo} alt="logo" style={{height:'5vh', margin:'1%'}} />
         
         Textmi.com
     

      </Box>
        <VStack alignItems={"center"} justifyContent={"center"} h={"100vh"} bg={"pink.100"}>
          
            <h1 style={{ color: "black", fontSize: 50 , fontWeight: 500 }}>Welcome to Textmi :D</h1>
            <p style={{color: 'black', fontSize: 20, fontWeight: 400, display:'flex', justifyItems:'center'}}> A common chatroom for you and your friends  <br/> &nbsp; &nbsp; &nbsp; share the link with your friends to join! 
            </p>
          <VStack h={"60vh"} w={'60vh'} bg={"black"} rounded={20} padding={"20px"} justifyContent={'center'}>
          <p style={{color: 'white', fontSize: 20, fontWeight: 400, display:'flex', justifyItems:'center'}}>Click to Join!!
            </p>
            <Button onClick={loginHandler} colorScheme="red" >
              Sign in with google
            </Button>
          </VStack>
        </VStack>
        <Box bg={'black'} p={10} color={'white'}>
        
    <p style={{display:'flex', justifyContent:'center', alignItems:'center'}}>&copy;2024 Textmi.com | All Rights Reserved</p>
        </Box>
       </>
      )}
    </Box>
  );
}

export default App;

