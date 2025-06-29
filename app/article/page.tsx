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
  Chip,
} from "@mui/material";
import {
  Eye,
  Trash2,
  Edit,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const articles = [
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Draft",
    author: "John Doe",
    date: "11/04/2024",
    category: "Technology",
  },
  {
    id: 2,
    title: "Another article title that demonstrates the layout and design.",
    status: "Published",
    author: "Jane Smith",
    date: "10/04/2024",
    category: "Business",
  },
  {
    id: 3,
    title: "This is a third article with a different status and category.",
    status: "Review",
    author: "Mike Johnson",
    date: "09/04/2024",
    category: "Health",
  },
  {
    id: 4,
    title: "Fourth article showcasing various article states and information.",
    status: "Draft",
    author: "Sarah Wilson",
    date: "08/04/2024",
    category: "Finance",
  },
  {
    id: 5,
    title: "Fifth article with comprehensive content and metadata.",
    status: "Published",
    author: "David Brown",
    date: "07/04/2024",
    category: "Technology",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "success";
    case "Draft":
      return "warning";
    case "Review":
      return "info";
    default:
      return "default";
  }
};

export default function ArticlePage() {
  return (
    <ProtectedRoute>
      {/* Header Section */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: { md: "space-between" }, mb: 3, gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#a03c50" }}>
            Article Management
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<Upload size={16} />}
              sx={{ borderColor: "#a03c50", color: "#a03c50" }}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              sx={{ borderColor: "#a03c50", color: "#a03c50" }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              sx={{
                bgcolor: "#a03c50",
                color: "white",
                "&:hover": { bgcolor: "#8a2f3f" },
              }}
            >
              Create Article
            </Button>
          </Box>
        </Box>

        {/* Search and Filter Section */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            <TextField
              placeholder="Search articles..."
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8, color: "#666" }} />,
              }}
            />
            <Button
              variant="outlined"
              startIcon={<Filter size={16} />}
              sx={{ borderColor: "#a03c50", color: "#a03c50" }}
            >
              Filter
            </Button>
          </Box>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value="all" displayEmpty>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="review">Review</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Articles Table */}
      <Box sx={{ px: 3, pb: 3 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {article.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={article.status}
                      color={getStatusColor(article.status) as any}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {article.author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={article.category}
                      variant="outlined"
                      size="small"
                      sx={{ borderColor: "#a03c50", color: "#a03c50" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {article.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton size="small" title="View">
                        <Eye size={16} style={{ color: "#a03c50" }} />
                      </IconButton>
                      <IconButton size="small" title="Edit">
                        <Edit size={16} style={{ color: "#a03c50" }} />
                      </IconButton>
                      <IconButton size="small" title="Delete">
                        <Trash2 size={16} style={{ color: "#a03c50" }} />
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
              <Select value={10} displayEmpty>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant="body2">1 - 5 of 5</Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" disabled>
              <FileText size={16} />
            </IconButton>
            <IconButton size="small" disabled>
              <FileText size={16} />
            </IconButton>
            <IconButton size="small" disabled>
              <FileText size={16} />
            </IconButton>
            <IconButton size="small" disabled>
              <FileText size={16} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
} 