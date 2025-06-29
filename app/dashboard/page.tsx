"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import {
  Eye,
  Trash2,
  Edit,
  FileText,
  BarChart2,
  CheckCircle,
  Globe2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const stats = [
  {
    label: "New",
    value: 10,
    icon: <FileText style={{ color: "#a03c50" }} size={32} />,
  },
  {
    label: "Draft",
    value: 4,
    icon: <BarChart2 style={{ color: "#a03c50" }} size={32} />,
  },
  {
    label: "Final",
    value: 6,
    icon: <CheckCircle style={{ color: "#a03c50" }} size={32} />,
  },
  {
    label: "Published Article",
    value: 2,
    icon: <Globe2 style={{ color: "#a03c50" }} size={32} />,
  },
];

const recentArticles = Array(5).fill({
  title:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "11/04/2024",
});

const financials = [
  { name: "Company Name 1", ticker: "ACAD", change: -5 },
  { name: "Company Name 2", ticker: "ACT", change: 2.3 },
  { name: "Company Name 3", ticker: "ADVM", change: 2.3 },
  { name: "Company Name 4", ticker: "AXP", change: -5 },
];

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      {/* Stats */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 3 }}>
          {stats.map((stat, i) => (
            <Card key={i} sx={{ textAlign: "center", py: 3 }}>
              <CardContent>
                <Box sx={{ mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h3" sx={{ color: "#a03c50", fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Recent Accessed Article */}
      <Box sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: { md: "space-between" }, mb: 2, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
            Recent Accessed Article
          </Typography>
          <Box sx={{ display: "flex", gap: 2, width: { xs: "100%", md: "auto" } }}>
            <TextField
              placeholder="Search recent accessed article..."
              size="small"
              sx={{ maxWidth: 300 }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#a03c50",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 1,
                fontWeight: "semibold",
                textTransform: "none",
              }}
            >
              + Add New
            </Button>
          </Box>
        </Box>
        
        <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentArticles.map((a, i) => (
                <TableRow key={i}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton size="small">
                        <Eye size={16} style={{ color: "#a03c50" }} />
                      </IconButton>
                      <IconButton size="small">
                        <Trash2 size={16} style={{ color: "#a03c50" }} />
                      </IconButton>
                      <IconButton size="small">
                        <Edit size={16} style={{ color: "#a03c50" }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2">Items per page:</Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select value={5} displayEmpty>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant="body2">1 - 10 of 20</Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small">
              <ChevronsLeft size={16} />
            </IconButton>
            <IconButton size="small">
              <ChevronLeft size={16} />
            </IconButton>
            <IconButton size="small">
              <ChevronRight size={16} />
            </IconButton>
            <IconButton size="small">
              <ChevronsRight size={16} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Financial Information */}
      <Box sx={{ px: 3, py: 2, pb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "semibold", mb: 2 }}>
          Financial Information
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>Company Name</TableCell>
                <TableCell>Ticker</TableCell>
                <TableCell>Percentage Changes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financials.map((f, i) => (
                <TableRow key={i}>
                  <TableCell>{f.name}</TableCell>
                  <TableCell>{f.ticker}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: f.change >= 0 ? "success.main" : "error.main",
                      }}
                    >
                      {f.change >= 0 ? "+" : ""}
                      {f.change}%
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ProtectedRoute>
  );
}
