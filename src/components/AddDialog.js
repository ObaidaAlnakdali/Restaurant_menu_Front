import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import TextField from '@mui/material/TextField';
import defaultImage from '../defaultImage.png';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import './style.css';

import { Context } from '../context/Context';


function AddDialog({ type, open, setOpen, ...props }) {
    const {category, setCategory, setItems, items } = useContext(Context)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [categoryID, setCategoryID] = useState("")
    const [active, setActive] = useState(true)
    const [categorySelect, setCategorySelect] = useState(1)
    const [file, setFile] = useState()
    const [imageAdd, setImageAdd] = useState(defaultImage)

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCategorySelect(event.target.value);
      };
    
    const handleOnChange = () => {
    setActive(!active);
    };

    const handelChangeImage = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("uploaded_file", e.target.files[0]);
        axios.post(`http://localhost:8000/api/UploadImage`, formData)
            .then(res => {
                setFile(res.data?.filename)
                setImageAdd(URL.createObjectURL(e.target.files[0]));
            }).catch(err => {
                console.log(err)
            })
    }

    const addItem = () => {
        const body = { 
            title: title, 
            price: price, 
            description: description, 
            active: active, 
            category: categorySelect,
            image: file,
        } 
        console.log("body", body)
        axios.post(`http://localhost:8000/api/item`, body)
            .then(res => {
                body['_id'] = res.data.response._id
                setItems(current => [...current, body]);
                setTitle("")
                setImageAdd(defaultImage)
                setOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addCategory = () => {
            const body = { title: title, icon: file }
            axios.post(`http://localhost:8000/api/category`, body)
                .then(res => {
                    body['_id'] = res.data.response._id
                    setCategory(current => [...current, body]);
                    setTitle("")
                    setImageAdd(defaultImage)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {
                    type === "category" ?
                        "Add new category" : "Add new food"
                }
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    padding: "0 30px"
                }}
            >
                {
                    type === "category" ?
                        (
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        margin: "10px 10px 30px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <img src={imageAdd} className="defaultImage" />
                                    <IconButton
                                        aria-label="delete"
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            color: "#ff661d",
                                            position: "absolute",
                                            bottom: "0px",
                                            right: "20px",
                                        }} >
                                        <BorderColorSharpIcon fontSize="small" />
                                        <input
                                            type="file"
                                            onChange={handelChangeImage}
                                            accept="image/*"
                                            hidden
                                        />
                                    </IconButton>
                                </Box>
                                <TextField
                                    label="Title"
                                    variant="filled"
                                    size="small"
                                    color="warning"
                                    required
                                    inputProps={{ style: { width: '100%', fontSize: 14, } }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Box>
                        )
                        :
                        (
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        margin: "10px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <img src={imageAdd} className="defaultImageItem" />
                                    <IconButton
                                        aria-label="delete"
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            color: "#ff661d",
                                            position: "absolute",
                                            bottom: "0px",
                                            right: "10px",
                                        }} >
                                        <BorderColorSharpIcon fontSize="small" />
                                        <input
                                            type="file"
                                            onChange={handelChangeImage}
                                            accept="image/*"
                                            hidden
                                        />
                                    </IconButton>
                                </Box>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    required
                                    inputProps={{ style: { fontSize: 12, height: "15px" } }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    label={null}
                                    placeholder='Title'
                                    sx={{
                                        margin: "5px 0",
                                        width: { sm: 200, md: 300 },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff661d',
                                            }
                                        },
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    required
                                    inputProps={{ style: { fontSize: 12, height: "15px" } }}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    label={null}
                                    placeholder='Price'
                                    sx={{
                                        margin: "5px 0",
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff661d',
                                            }
                                        },
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                    }}
                                />
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label={null}
                                    size="small"
                                    color="warning"
                                    inputProps={{ style: { fontSize: 12, height: "15px" } }}
                                    value={categorySelect}
                                    onChange={handleChange}
                                    helperText="Please select your category"
                                    sx={{
                                        margin: "5px 0",
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff661d',
                                            }
                                        },
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 }
                                    }}
                                >
                                    <MenuItem
                                            value={1}
                                        >
                                            Choose Category
                                        </MenuItem>
                                    {category.map((option) => (
                                        <MenuItem
                                            key={option._id}
                                            value={option._id}
                                        >
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    //label="Title"
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    required
                                    inputProps={{ style: { fontSize: 12 } }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    label={null}
                                    placeholder='Description'
                                    multiline
                                    rows={3}
                                    sx={{
                                        margin: "5px 0",
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff661d',
                                            }
                                        },
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                    }}
                                />
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                <span className="item-active-span">Active</span>
                                    <Checkbox
                                        size="small"
                                        checked={active}
                                        onChange={handleOnChange}
                                        sx={{
                                            color: "#c17e5e",
                                            '&.Mui-checked': {
                                                color: "#ff661d",
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        )
                }

            </DialogContent>
            <DialogActions>
                {
                    type === "item" ?
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            sx={{
                                backgroundColor: "#ff661d",
                                margin: "8px",
                                fontSize: "12px",
                                padding: "5px 40px"
                            }}
                            onClick={() => addItem()}
                        >
                            Add
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            sx={{
                                backgroundColor: "#ff661d",
                                margin: "8px",
                                fontSize: "12px",
                                padding: "5px 40px"
                            }}
                            onClick={() => addCategory()}
                        >
                            Add
                        </Button>
                }
                
                <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{
                        backgroundColor: "#686868",
                        margin: "8px",
                        fontSize: "12px",
                        padding: "5px 30px"
                    }}
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddDialog;