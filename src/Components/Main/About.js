import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { SET_MESSAGE } from "../../Store/Actions/ActionTypes";

const About = (props) => {

    console.log(props);

    useEffect(()=> {
        Almessage();                   
    })

      const Almessage = () => {
        props.dispatch({
            type: SET_MESSAGE,
            payload: { message:"Some Fields Needs to Be Verify", variant:'Error' },
          });
      }

    const { message } = props;
    console.log(message);
    return (
        <div className="content">
            <h1>About</h1>
        </div>
    )
}


function mapStateToProps(state) {
    const { message } = state.message;
    return {
      message,
    };
}
  
  export default connect(mapStateToProps)(About);