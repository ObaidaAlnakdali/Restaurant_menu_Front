import React, { useState, useContext } from "react";
import Header from "../components/Header";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from "../components/Card";
import { Context } from '../context/Context';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import IconButton from '@mui/material/IconButton';
import AddDialog from "../components/AddDialog";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import './style.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Dashboard() {
  const { category, items } = useContext(Context)
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="Dashboard_page">
      <Header text="Dashboard Admin" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            //textColor="secondary" 
            //indicatorColor="#fff" 
            TabIndicatorProps={{ sx: { backgroundColor: "#ff661d" } }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& button:active": { color: "#ff661d" },
              "& button:focus": { color: "#ff661d" },
              "& button.Mui-selected": { color: "#686868" },
            }}
          >
            <Tab label="Category" {...a11yProps(0)} />
            <Tab label="Food" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {
            category.map((category, i) => {
              return (
                <Card
                  key={i}
                  type="category"
                  title={category.title}
                  image={category.icon}
                  id={category._id}
                />
              )
            })
          }
          <Box
            sx={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "#ff661df5",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <IconButton aria-label="add" onClick={() => {setOpen(true); setType("category")}}>
              <AddSharpIcon />
            </IconButton>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {
            items.map((item, i) => {
              return (
                <Card
                  key={i}
                  type="item"
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  active={item.active}
                  id={item._id}
                  category={item.category}
                />
              )
            })
          }
          <Box
            sx={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "#ff661df5",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <IconButton aria-label="add" onClick={() => {setOpen(true); setType("item")}}>
              <AddSharpIcon />
            </IconButton>          
          </Box>
        </TabPanel>
      </Box>

      <AddDialog 
        open={open} 
        setOpen={setOpen} 
        type={type}
      />
    </div>
  );
}

export default Dashboard;