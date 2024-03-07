import React from 'react';
import { users} from "../../constants/constants";
import styles from './ProfileListings.module.scss';

export const ProfileListings = ()=> {
    // States
    const [data, setData] = React.useState([]);
    
    // Form Field States
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");

    // Button Disabled State
    const [disabled, setDisabled] = React.useState(true);

    // Effects
    // This effect with an empty dependency array gets triggered every time the component mounts
    // We are importing mock data as an array of user objects from constants
    // On Mounting we are setting data using setData-method
    React.useEffect(()=> {setData(users)}, []);
    // Side effect to update disable ststua of button
    // We are adding dependency array [firstName, lastName, email]
    // Only if all fields are entered button will be active
    React.useEffect(()=> {
        if(
            firstName.length > 0 &&
            lastName.length > 0 &&
            email.length > 0
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [firstName, lastName, email])

    // Events
    // Form submit event
    const handleSubmit = (event) => {
        event.preventDefault();

        // Creating new user schema
        const new_user = {
            id: users.length,
            firstName: firstName,
            lastName: lastName,
            email: email,
            likes: 0,
            isActive: true,
        }

        // Adding new user to state
        setData([...data, new_user]);

        // Clearing fields
        setFirstName("");
        setLastName("");
        setEmail("");
        
    };

    // Updating state of fields
    const updateFirstName = (event) => setFirstName(event.target.value);
    const updateLastName = (event) => setLastName(event.target.value);
    const updateEmail = (event) => setEmail(event.target.value);

    // Increment and Decrement number of likes
    const handleIncrement = (event)=> {
        // Button click event is the argument
        // Value that is registered to button is found inside event.target.value
        const {value} = event.target;
        setData(
            // Creating a new array to set as Data
            // By mapping through existing data<array>
            // if value is same as element.likes-> increas likes property by 1
            data.map((element)=> {
                if(element.id.toString() === value) {
                    return{
                        ...element,
                        likes: element.likes + 1
                    }
                }else {
                    return element
                }
            })
        )
    }
    const handleDecrement = (event)=> {
        // Button click event is the argument
        // Value that is registered to button is found inside event.target.value
        const {value} = event.target;
        setData(
            // Creating a new array to set as Data
            // By mapping through existing data<array>
            // if value is same as element.likes-> decrease likes property by 1
            // Also checking if likes for each user object is greater than 0
            data.map((element)=> {
                if(element.id.toString() === value && element.likes > 0) {
                    return{
                        ...element,
                        likes: element.likes - 1
                    }
                }else {
                    return element
                }
            })
        )
    }

    // Renderer
    return(
        <React.Fragment>
            <div className={styles["listing-wrapper"]}>
                <div className={styles["list-container"]}>
                    <div className={styles["scrollable-container"]}>
                    {
                        data
                        .sort((a, b) => b.likes - a.likes)// Sorting in the descending order of likes
                        .map((element)=> {
                            return(
                                <div 
                                    key={`user-key-${element.id}`}
                                    className={styles['profile-card']}
                                >
                                    <div className={styles["card-header"]}>
                                        <div className={styles["card-header-content"]}>
                                            <div className={styles["avatar"]}>
                                                {`${element.firstName[0]} ${element.lastName[0]}`}
                                            </div>
                                            <div className={styles["typography"]}>
                                                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                                                <h6>{`${element.email}`}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles["card-counter"]}>
                                        <div className={styles["counter-padded"]}>
                                            <div className={styles["counter-component"]}>
                                                <button
                                                    className={styles["minus"]}
                                                    value={element.id}
                                                    onClick={handleDecrement}
                                                >
                                                    -
                                                </button>
                                                <div className={styles["counter-padded"]}>
                                                    <h3>{`${element.likes} Likes`}</h3>
                                                </div>
                                                <button
                                                    className={styles["plus"]}
                                                    value={element.id}
                                                    onClick={handleIncrement}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className={styles["control-panel"]}>
                    <div className={styles["create-user-section"]}>
                        <div className={styles["create-user-container"]}>
                            <div className={styles["create-user-card"]}>
                                <h4>Add new user</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles["form-wrapper"]}>
                                        <input 
                                            type="text" 
                                            placeholder="First name" 
                                            value={firstName}
                                            onChange={updateFirstName}
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Last name" 
                                            value={lastName}
                                            onChange={updateLastName}
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Email" 
                                            value={email}
                                            onChange={updateEmail}
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={disabled}
                                        className={styles["submit-button"]}
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
