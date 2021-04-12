import React,{useState} from 'react';
import Axios from 'axios';
import './App.css';

function Employees() {
    const [employeename, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [roll, setRoll] = useState("");
    const [address, setAddress] = useState("");

    const [details,setDetails] = useState([]);

    const [newroll,setNewroll] = useState("");

    // GETING EMPLOYEE details

    const getemployees = () =>{
        Axios.get('http://localhost:3001/getemployees').then((response)=>{
        //  console.log(response.data);
        setDetails(response.data)
    })
    }

    // ADDING EMPLOYEE DETAILS

    const addemployee =()=>{
        Axios.post('http://localhost:3001/create',{
            employeename:employeename,
            age:age,
            gender:gender,
            roll:roll,
            address:address
        }).then(()=>{
            // console.log('Success');
            setDetails([
                ...details,
                {employeename:employeename, age:age, gender:gender, roll:roll, address:address}
            ]);
        });
    };

    // DELETING EMPLOYEE DETAILS

    const deleteEmployee = (Names)=>{
        Axios.delete(`http://localhost:3001/delete/${Names}`);
    }

    // UPDATING EMPLOYEE DETAILS

    const UpdateEmployee = (Names)=>{
        Axios.put("http://localhost:3001/update",
        
        {employeename:Names, roll:newroll});
        setNewroll("")
    }

    return (
        <div>
        <div className='details'>
            <h1>VK Technology</h1>
            
            <label>Name :</label><br/>
            <input type='text' name='employeename' onChange={(e)=>setName(e.target.value)} required/><br/>
            
            <label>Age :</label> <br/>
            <input type='number' name='age' onChange={(e)=>setAge(e.target.value)} required/><br/>
            <label>Gender :</label> <br/>
            <input type='radio' name='gender' id='Male' value='Male' onChange={(e)=>setGender(e.target.value)}/>
            <label for='Male'>Male</label>
            <input type='radio' name='gender' id='Female' value='Female' onChange={(e)=>setGender(e.target.value)}/>
            <label for='Female'>Female</label>
            <input type='radio' name='gender' id='Transgender' value='Transgender' onChange={(e)=>setGender(e.target.value)}/>
            <label for='Transgender'>Transgender</label><br/>
            
            <label>Roll :</label><br/>
            <select name='roll' onChange={(e)=>setRoll(e.target.value)}>
                <option>Select Roll</option>
                <option>UI/UX Designer</option>
                <option>Backend Developer</option>
                <option>FullStack Developer</option>
            
            </select><br/>
            <label>Address :</label><br/>
            <input type='text' name='address' onChange={(e)=>setAddress(e.target.value)} required/><br/>
            
            <button onClick={addemployee}>Add Employee Details</button> <br/>
            </div>

            <button onClick={getemployees}>show Employees</button>

            {
                details.map((val)=>{
                    return (<div className="employeedetails"> 
                    <div className="employeedetails-sub">
                        <h4>Employee Name : <br/>   {val.employeename}</h4>
                        <h4>Age:    <br/>   {val.age}</h4> 
                        <h4>Gender: <br/>   {val.gender}</h4> 
                        <h4>Roll:   <br/>   {val.roll}</h4> 
                        <h4>Address:<br/>   {val.address}</h4> <br/>
                    </div> <br/>
                    <div className="employeedetails-buttons">
                    <button onClick={()=>{deleteEmployee(val.employeename)}}>Delete</button>
                    <input type='text' id='updateing' placeholder="update roll" onChange={(e)=>setNewroll(e.target.value)}/>
                    <button onClick={()=>{UpdateEmployee(val.employeename)}}>Update</button>
                    </div>    
                     </div>
                     
                     )
                })
                
            }
            
        </div>
        
    )
}

export default Employees
