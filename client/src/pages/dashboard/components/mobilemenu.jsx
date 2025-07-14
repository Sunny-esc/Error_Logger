import { useState } from "react";
import ChangeTheme from "../../../changetheme";
import home from "../home.svg";
import info from "../info.svg";
import notes from "../notes.svg";
import account from "../account.svg";
import archive from "../archive.svg";
import Logoutbutton from "../../../comp/logout";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Box, Button } from "@mui/material";
import { 
   User, Bell, 
} from "lucide-react";

export default function Mobilenav({
  onNotesClick,
  onsaved,
  onprofile,
  onhomeClick,
  oninfo,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-2">
        <span className="bg-white rounded-xl ">
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className=""
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </span>
          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center "   onClick={() => {
              onhomeClick();
            }}>
                              <h1 className="text-2xl font-bold">Dashboard</h1>
                            </div>
        
                            <div className="flex items-center gap-4">
                             
                              <button className="p-2 rounded-lg hover:bg-slate-300"  onClick={() => {
              onprofile();
              
            }}>
                                <User className="w-5 h-5 " />
                              </button>
                            </div>
                          </div>

        <ChangeTheme />
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="backdrop-blur-2xl"
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: "white",
            borderRadius: "0 8px 8px 0",
            padding: 2,
            opacity: "20px",
          },
        }}
      >
        <Box display="flex " flexDirection="column" gap={2}>
          <Button
            onClick={() => {
              onhomeClick();
              setMobileMenuOpen(false);
            }}
            startIcon={<img src={home} alt="Home" className="w-6" />}
            sx={{ justifyContent: "flex-start" }}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              onNotesClick();
              setMobileMenuOpen(false);
            }}
            startIcon={<img src={notes} alt="Notes" className="w-6" />}
            sx={{ justifyContent: "flex-start" }}
          >
            Notes
          </Button>
          <Button
            onClick={() => {
              onsaved();
              setMobileMenuOpen(false);
            }}
            startIcon={<img src={archive} alt="Saved" className="w-6" />}
            sx={{ justifyContent: "flex-start" }}
          >
            Saved
          </Button>
          <Button
            onClick={() => {
              onprofile();
              setMobileMenuOpen(false);
            }}
            startIcon={<img src={info} alt="Account" className="w-6" />}
            sx={{ justifyContent: "flex-start" }}
          >
            Account
          </Button>
          <Button
            onClick={() => {
              oninfo();
              setMobileMenuOpen(false);
            }}
            startIcon={<img src={account} alt="Info" className="w-6" />}
            sx={{ justifyContent: "flex-start" }}
          >
            Info
          </Button>

          <Box mt={2}>
            <Logoutbutton />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
