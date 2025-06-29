"use client";
import React from "react";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { muiTheme } from '../theme/mui-theme';
import ThemeProvider from "./ThemeProvider";
import LayoutWrapper from "./LayoutWrapper";
import { AuthProvider } from "../context/AuthContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MuiThemeProvider theme={muiTheme}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </MuiThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
} 