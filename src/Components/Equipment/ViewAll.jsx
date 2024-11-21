import React, { useState } from 'react'
import './ViewAll.css'
import PopDelete from './PopDelete'
import Addequipment from './Addequipment'

function ViewAll() {
    const [pop,setPop]=useState(false)
    const [pope,setPope]=useState(false)
    return (
        <div id='alltable' >
            <h2 style={{marginBottom:'30px', marginTop:'30px'}}>Equipment Equipments List </h2>

            <div className="table">

                <table>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>QUANTITY</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  | 
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  | 
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>Multimiter</th>
                        <th>5</th>
                        <th>yes</th>
                        <th>19/02/2001</th>
                        <th style={{color:'blue'}}> 
                        <span style={{cursor:"pointer"}} onClick={()=>setPope(true)}  >Edit</span>  |
                        <span style={{cursor:"pointer"}} onClick={()=>setPop(true)}>Delete</span></th>
                    </tr>


                    
                </table>

            </div>
{pop &&  <PopDelete onhide={() => setPop(false)} />}
{pope && <Addequipment ongo={()=>setPope(false)} /> }

        </div>
    )
}

export default ViewAll
