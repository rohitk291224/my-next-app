import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
export default function HomePage() {
  return (
    <>
      <Box p={2} bgcolor="#f8eaea" mb={2} borderRadius={2}>
        <Typography variant="h5" color="#a03c50" gutterBottom>
          MUI Demo Section
        </Typography>
        <Button variant="contained" color="primary">
          MUI Button
        </Button>
      </Box>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
      </div>
    </>
  );
}
