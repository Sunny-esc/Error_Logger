// NoteModal.jsx
import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function NoteModal({ open, onClose, note, setNote, onSave, onDelete }) {
  if (!note) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Edit Note</Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Label"
          value={note.label}
          onChange={(e) => setNote({ ...note, label: e.target.value })}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Language"
          value={note.lang}
          onChange={(e) => setNote({ ...note, lang: e.target.value })}
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          margin="normal"
          label="Message"
          value={note.message}
          onChange={(e) => setNote({ ...note, message: e.target.value })}
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="outlined" color="error" onClick={onDelete}>Delete</Button>
        </Box>
      </Box>
    </Modal>
  );
}
