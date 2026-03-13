import { Box, Skeleton } from "@mui/material";

function ProductPreviewSkeleton() {
  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", minHeight: "70vh" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rounded"
            width="100%"
            height={400}
            sx={{ borderRadius: 3 }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            {Array.from(new Array(5)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={80}
                height={80}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" }, p: 6 }}>
          <Skeleton variant="text" width="70%" height={50} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="30%" height={30} sx={{ mt: 1 }} />

          <Box sx={{ mt: 3 }}>
            <Skeleton variant="rectangular" width="60%" height={60} />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="95%" />
            <Skeleton variant="text" width="90%" />
          </Box>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Skeleton variant="rounded" width={50} height={50} />
            <Skeleton variant="rounded" width={80} height={50} />
            <Skeleton variant="rounded" width={50} height={50} />
          </Box>

          <Skeleton variant="rounded" width="100%" height={50} sx={{ mt: 4 }} />

          <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
            <Skeleton variant="rounded" width="50%" height={100} />
            <Skeleton variant="rounded" width="50%" height={100} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPreviewSkeleton;
