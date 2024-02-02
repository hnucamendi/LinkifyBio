import { Box, Link, Typography, IconButton, Breadcrumbs } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavBar({ selectedPageId }) {
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="left" alignItems="center">
      <IconButton onClick={() => navigate("/console/actions")}>
        <ArrowBack />
      </IconButton>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/console">
          home
        </Link>
        <Link underline="hover" color="inherit" href="/console/actions">
          {selectedPageId}
        </Link>
        <Typography color="text.primary">colors</Typography>
      </Breadcrumbs>
    </Box>
  );
}

NavBar.propTypes = {
  selectedPageId: PropTypes.string.isRequired,
};