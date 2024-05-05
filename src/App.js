import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField, Modal, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';


const pages = ['Material', 'Elements', 'Projects', 'Manufacturers', 'Collections'];



const useStyles = makeStyles({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120 // Set a minimum height for the card
  },
  addIconBackground: {
    backgroundColor: `rgba(134, 68, 162,0.2)`,
  },
  paper: {
    position: 'absolute',
    width: 500,
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#F6F5F2',
    borderRadius: '10px',
    //  theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  Buttons: {
    display: 'flex',
    justifyContent: 'right',
  },
  textCount: {
    display: 'flex',
    justifyContent: 'right',
  }
});


const App = () => {

  const [currentPage, setCurrentPage] = useState('Collections');

  const handleButtonClick = (pageName) => {
    setCurrentPage(pageName);

  };

  const [openCollection, setOpenCollection] = React.useState(true);

  const handleClick = () => {
    setOpenCollection(!openCollection);
  };

  const [open, setOpen] = useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [formData, setFormData] = useState(
    {
      collectionName: '',
      description: '',
    }
  );
  const [collections, setCollections] = useState([]);

  const [charCount, setCharCount] = useState({
    collectionName: 0,
    description: 0,
  });

  const maxChars = {
    collectionName: 40,
    description: 140,
  };

  console.log(collections)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteModal = (index) => {
    setOpenDeleteConfirmation(true);
    setSelectedIndex(index)

    // handleDelete(index)
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setCharCount({ ...charCount, [name]: value.length });
  };

  const handleSubmit = (event) => {

    const newCollection = { ...formData };
    setCollections([...collections, newCollection]);
    setFormData({ collectionName: '', description: '' });
    setCharCount({ collectionName: 0, description: 0 });
    handleClose();
  };

  const isSubmitDisabled = () => {
    return charCount.collectionName === 0 || charCount.description === 0 || charCount.collectionName > maxChars.collectionName || charCount.description > maxChars.description;
  };



  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDelete = () => {
    const updatedCollections = collections.filter((_, i) => i !== selectedIndex);
    setCollections(updatedCollections);
    setOpenDeleteConfirmation(false)
  };


  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [isActive, setIsActive] = useState(1); // Initially active state for the first button


  return (
    <>

      <AppBar position="static" style={{ background: '#FFFFFF' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src='revaku.png' style={{ width: '30px', height: '30px' }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"
                      
                    >{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleButtonClick(page)
                    handleCloseNavMenu()}}
                  sx={{ my: 2, color: currentPage === page ? "#6C3CD7" : "black", display: 'block' ,background: currentPage === page ? "#ECE6FA" : "",borderRadius:currentPage === page ? "12px" : ""}}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div
        style={{
          width: '1440px',
          height: '820px',
          padding: '24px 36px 24px 36px',
          Gap: '20px',
          background: '#F6F5F2'
        }}
      >
        <div
          // style={{
          //   width: '252px',
          //   height: 'auto',
          //   borderRadius: '12px',
          //   padding: '16px 0px 0px 0px',
          //   gap: '16px',
          //   border: '1px 0px 0px 0px',
          //   opacity: '0px',
          //   background: '#F6F5F2',
          //   Gap: '16px',
          //   boxShadow: "1.33px 2.67px 13.33px 0px #0000001A"
          // }}
        >


    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' ,

      width: '252px',
      height: 'auto',
      borderRadius: '12px',
      padding: '16px 0px 0px 0px',
      gap: '16px',
      border: '1px 0px 0px 0px',
      opacity: '0px',
      background: '#F6F5F2',
      Gap: '16px',
      boxShadow: "1.33px 2.67px 13.33px 0px #0000001A"
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
     
      <ListItemButton onClick={handleClick}>
 
        <ListItemText primary="My Collection" />
        {openCollection ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollection} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
        <List>
            {collections.map((item,index) => (
              <List>
              <ListItemButton key={item.collectionName} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FolderOpenOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={item.collectionName + " " + `${index + 1}`} />
              </ListItemButton>
              </List>
            ))}
    </List>
        </List>
      </Collapse>
      <hr/>
      <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CreateNewFolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="New Collection" />
          </ListItemButton>
        </List>
    
    </List>

        </div>

        <div
          style={{ position: 'absolute', top: '92px', width: '78%', left: '20%' }}
        >
          <div
            style={{ width: '100%', height: '139px', border: '0px 0px 1px 0px', Gap: '12px', background: '#F6F5F2' }}
          >
            <div
              style={{ width: '352px', height: '89px', Gap: '32px', background: '#F6F5F2' }}
            >
              <Typography
                sx={{ fontWeight: '500', fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.03em', fontFamily: 'Inter', textAlign: 'left' }}
              >
                My Collection
                <Typography
                  sx={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: '400', lineHeight: '16.25px', textAlign: 'left', color: '#2B2B2B' }}
                >
                  Introducing collections: the ability to organise your materials, your way.
                </Typography>
              </Typography>

            </div>
            <div
              style={{ width: '100%', height: '32px', background: '#F6F5F2'}}
            >
              <Typography
                sx={{ gap: '0px', justifyContent: 'center', display: 'flex', opacity: '0px', color:'#B4B4B8',fontWeight:'border' }}
              >
                Showing 118 Results
              </Typography>
            </div>
            <hr/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'left', padding: '20px', backgroundColor: '#F6F5F2', width: 'auto' }}
          >
            <Grid container spacing={2} style={{ marginTop: '20px', Gap: '20px' }} item xs={12} sm={6} md={4} lg={12}

            >
              {collections.length !== 0 && collections.map((item, index) => (
                <Grid item key={item.collectionName} xs={12} sm={6} md={4} lg={4} >
                  <Card style={{
                    margin: 'auto', background: '#FFFFFF', borderRadius: '12px', Gap: '16px'
                    , height: "157px", width: '352px'
                    ,
                    border: '1px solid #D9D9D6'
                  }}>


                    <span style={{ borderRadius: '12px', padding: '6px', marginLeft: '15px', backgroundColor: '#ECE6FA' }}>
                      <label>Download Data</label>
                      <IconButton>
                      {/* <label>Download Data</label> */}
                        <CloudDownloadOutlinedIcon />
                      </IconButton>
                    </span>
                    <span
                    style={{marginLeft:'60px'}}
                    >
                    {"87"}

                    <IconButton>
                      <img src='3D-rectangle.png' style={{width:'30px',height:'30px'}}/>
                    </IconButton>

                    <IconButton
                      onClick={() => handleOpenDeleteModal(index)}
                      sx={{borderRadius:'12px',
                      ':hover': {
                        backgroundColor: '#7469B6', // Change background color on hover
                       
                      },
                          
                      }}
                      >
                        <img src='bin.png' style={{width:'15px',height:'15px'}}/>
                      {/* <DeleteIcon /> */}
                    </IconButton> 
                    </span>
                    <CardContent
                      sx={{ width: '312px', height: '76px', Gap: '12px' }}
                    >
                      <Typography variant="h5" component="h2"
                        sx={{ fontSize: '16px', fontWeight: '500', lineHeight: '16px' }}
                      >
                        {item.collectionName}
                      </Typography>
                      <Typography color="textSecondary"
                        sx={{ fontSize: '13px', fontWeight: '400' }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4} lg={4} >

                <Card
                  style={{
                    margin: 'auto', borderRadius: '10px', backgroundColor: `rgba(0, 0,0 ,0.1)`, opacity: '0.5', height: "157px", width: '352px',

                  }
                  }>
                  <CardContent
                    className={classes.card}
                  >
                    <Fab aria-label="add"
                      className={classes.addIconBackground}
                      onClick={handleOpen}
                    >
                      <AddIcon />
                    </Fab>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div className={classes.paper}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="collection-form-modal-title"
                aria-describedby="collection-form-modal-description"
              >
                <div className={classes.paper}>
                  <h2 id="collection-form-modal-title">New Collection</h2>
                  <form onSubmit={handleSubmit}>
                    <label>Collection Name

                      <TextField
                        // label="Collection Name"
                        name="collectionName"
                        value={formData.collectionName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder='collection Title'
                      />
                    </label>
                    <div

                      className={classes.textCount}
                    >{charCount.collectionName}/{maxChars.collectionName}</div>
                    <label>Description
                      <TextField
                        // label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        margin="normal"
                      />
                    </label>
                    <div

                      className={classes.textCount}

                    >{charCount.description}/{maxChars.description}</div>
                    <p></p>
                    <div
                      className={classes.Buttons}

                    >
                      <Button
                        onClick={handleClose}>
                        Close
                      </Button>
                      <Button type="submit" variant="contained" color="secondary" disabled={isSubmitDisabled()
                      }

                      >
                        Create Collection
                      </Button>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>

            <div className={classes.paper}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="collection-form-modal-title"
                aria-describedby="collection-form-modal-description"
              >
                <div className={classes.paper}>
                  <h2 id="collection-form-modal-title">New Collection</h2>
                  <form onSubmit={handleSubmit}>
                    <label>Collection Name

                      <TextField
                        // label="Collection Name"
                        name="collectionName"
                        value={formData.collectionName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder='collection Title'
                      />
                    </label>
                    <div

                      className={classes.textCount}
                    >{charCount.collectionName}/{maxChars.collectionName}</div>
                    <label>Description
                      <TextField
                        // label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        margin="normal"
                      />
                    </label>
                    <div

                      className={classes.textCount}

                    >{charCount.description}/{maxChars.description}</div>
                    <p></p>
                    <div
                      className={classes.Buttons}

                    >
                      <Button
                        onClick={handleClose}>
                        Close
                      </Button>

                      <Button type="submit" variant="contained" color="secondary" disabled={isSubmitDisabled()
                      }

                      >
                        Create Collection
                      </Button>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>

            <div>
              <Modal
                open={openDeleteConfirmation}
                onClose={handleClose}
                aria-labelledby="delete-confirmation-modal-title"
                aria-describedby="delete-confirmation-modal-description"

              >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, borderRadius: '10px', backgroundColor: '#F6F5F2' }}>
                  <Typography id="delete-confirmation-modal-title" variant="h6" component="h2" gutterBottom>
                    Delete Collection
                  </Typography>
                  <Typography id="delete-confirmation-modal-description" variant="body1" gutterBottom>
                    Are you sure you would like to delete this collection ?
                  </Typography>
                  <p></p>
                  
                  <div>
                    <Button onClick={handleDelete} variant="contained"
                      sx={{
                        mr: 2, width: '100%', height: '60px', borderRadius: '10px', background: '#7469B6', '&:hover': {
                          backgroundColor: '#7469B6', // Keeps the default background color on hover
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  <p></p>
                  <div>
                    <Button onClick={handleCloseDeleteModal} variant="contained" sx={{
                      mr: 2, width: '100%', height: '60px', borderRadius: '10px', backgroundColor: '#F6F5F2', color: 'black', '&:hover': {
                        backgroundColor: 'inherit', // Keeps the default background color on hover
                      },
                    }}>
                      Close
                    </Button>
                  </div>


                  {/* </Box> */}

                </Box>
              </Modal>
            </div>

          </div>
        </div>
      </div>



    </>
  );
};

export default App;
