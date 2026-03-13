import React from "react";
import { Drawer, List, ListItemText, ListItem, Box } from "@mui/material";

function Sidebar({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleClose}>
          <List>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
