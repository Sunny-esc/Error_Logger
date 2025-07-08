import React from "react";
import { createPortal } from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
export default function CodeViewModal({ open, onClose, code, language }) {
 return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxHeight: "80vh",
          bgcolor: "#1e1e1e",
          boxShadow: 24,
          borderRadius: 2,
          p: 2,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            borderBottom: "1px solid #444",
            pb: 1,
          }}
        >
          <Typography variant="subtitle2" color="white">
            Viewing Code: {language}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon sx={{ color: "#90caf9" }} />
          </IconButton>
        </Box>

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          wrapLongLines
          customStyle={{ background: "transparent", fontSize: 14 }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Modal>
  );
}