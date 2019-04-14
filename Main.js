import React from 'react';
import {  Text, View  , TouchableOpacity , Animated , TextInput , ScrollView } from 'react-native';
import { Button} from 'native-base';
import Styles from './styles';
import PostItem from './PostItem'
import Helper from './Helper';



export default class Main extends React.Component{
    state = {
        Anim: new Animated.Value(0), 
        moveAnimation : new Animated.ValueXY({ x: 10, y: 0 }),
        fadeAnim: new Animated.Value(0), 
        post_value :null,
        post_items : []
        // Initial value for opacity: 0
      }
    constructor(props)
    {
        super(props);
        this.fetchData();
       

    }

    componentDidMount(){
     
    }

    fetchData(){
     
      const action = "fetch";
      fetch(`https://fezrx27gxb.execute-api.us-east-2.amazonaws.com/dev_stage?action=${action}`,
                                                                           
      {
       method:"get",
       headers: {
         'Content-Type': 'application/json',
       },
    


   }
   ).then((response) => response.json())
   .then((responseJson) => {

    this.setState({post_items:responseJson.data},()=>{
      
    });

     

   }).catch(err=>{
     alert(err);
   })
    }

    addPost = ()=>{

      const action = "add";
      
      if(this.state.post_value==null)
      {
        alert("Please enter post body");
       
      }else{
      let post = this.state.post_value;
    
    

     
      fetch(`https://fezrx27gxb.execute-api.us-east-2.amazonaws.com/dev_stage?action=${action}&post=${post}`,
                                                                           
       {
        method:"get",
        headers: {
          'Content-Type': 'application/json',
        },
     


    }
    ).then((response) => response.json())
    .then((responseJson) => {

      alert("Posted succeed");

      this.fetchData();

    }).catch(err=>{
      alert(err);
    })
  }
  }

    componentDidMount() {
        Animated.spring(this.state.moveAnimation, {
            toValue: {x: 10, y: 200},
          }).start()
          this.fadeButton();  
                             // Starts the animation
      }
      setPost (e){
        this.setState({post_value:e.target.value});
      }

      fadeButton = ()=>{
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 10000,              // Make it take a while
            }
          ).start();  
      }
    render(){
        let { fadeAnim } = this.state;

        const PostItems = () =>{

        return this.state.post_items.map((item)=>{
          return <PostItem
          key ={item.id}
          data={{
            body : item.post_body,
            
            date : Helper.convertDate(item.create_at)
          }}  />
        })
        }
        return (
            

    <ScrollView  contentContainerStyle={Styles.container}>
  
   
    <Animated.View           // Special animatable View
    style={this.state.moveAnimation.getLayout()}
    
      >
 
    
<TextInput style={[{ borderColor: '#fff', borderBottomWidth: 1, padding: 5, width:300 }]}
placeholderTextColor="#fff"
 placeholder="Enter post"
 onChangeText={(e) =>{ this.setState({post_value:e})}}
 selectionColor="#fff">
 </TextInput>

   



</Animated.View>
<Animated.View           // Special animatable View
  style={{opacity:fadeAnim}}
      >
 

<Button warning style={Styles.buttonStyle} onPress={this.addPost} >

<Text style={{color:"white"}}>
    Add post
</Text>

   

</Button>

</Animated.View>
<Text style={{marginTop:20 , marginBottom:10 , color:"white"}}>Your Posts</Text>

<PostItems/>


    </ScrollView>
        )
    }

}

