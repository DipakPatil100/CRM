"use client";

import "regenerator-runtime/runtime";

import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  InputAdornment,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface Note {
  id: number;
  content: string;
  timestamp: string;
  expanded: boolean; // Track if the note is expanded
}

const LeadNote = () => {
  const { transcript, listening, resetTranscript } =
    useSpeechRecognition() as any;

  const [note, setNote] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleAudioInput = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
    setIsListening(!isListening);
  };

  const handleSaveNote = () => {
    if (note.trim() !== "") {
      const newNote: Note = {
        id: Date.now(),
        content: note,
        timestamp: new Date().toLocaleString(),
        expanded: false, // Default to not expanded
      };
      setNotes([...notes, newNote]);
      setNote("");
      resetTranscript();
    }
  };

  const toggleExpandNote = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, expanded: !note.expanded } : note
      )
    );
  };

  useEffect(() => {
    if (!listening && transcript) {
      setNote(transcript);
    }
    setIsListening(listening);
  }, [transcript, listening]);

  return (
    <>
      <Box sx={{ padding: "10px" }}>
        <TextField
          size="small"
          fullWidth
          multiline
          rows={3}
          name="note"
          onChange={inputHandler}
          value={note}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={isListening ? "Listening..." : "Write by voice"}>
                  <IconButton
                    color={"primary"}
                    aria-label="record voice"
                    onClick={handleAudioInput}
                    sx={{
                      width: "30px",
                      height: "30px",
                      mt: 1,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    {isListening ? <MicOffIcon /> : <MicNoneIcon />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveNote}
          sx={{ mt: 2 }}
        >
          Save Note
        </Button>
      </Box>

      {/* Notes Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Notes Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Note</strong></TableCell>
                <TableCell><strong>Timestamp</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, index) => (
                <TableRow key={note.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {note.expanded
                      ? note.content
                      : note.content.length > 50
                      ? `${note.content.substring(0, 50)}...`
                      : note.content}
                    {note.content.length > 50 && (
                      <Button
                        onClick={() => toggleExpandNote(note.id)}
                        size="small"
                        sx={{ ml: 1, color:"blue" }}
                      >
                        {note.expanded ? "Read Less" : "Read More"}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{note.timestamp}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setNotes(notes.filter((n) => n.id !== note.id));
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {notes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No notes available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default LeadNote;
