import { Card, CardContent, Skeleton, Box } from "@mui/material";

function ProductsSkeleton() {
  return (
    <Box>
      <Card
        sx={{
          borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          //   backgroundColor: "#fcefb8",
          position: "relative",
        }}
      >
        {/* Wishlist Icon */}
        <Skeleton
          variant="circular"
          width={36}
          height={36}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
          }}
        />

        {/* Product Image */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={240}
          width="100%"
        />

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2.5,
          }}
        >
          {/* Title */}
          <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />

          {/* Price */}
          <Skeleton variant="text" width="40%" height={25} />

          {/* Rating */}
          <Skeleton
            variant="rectangular"
            width="60%"
            height={20}
            sx={{ mt: 1 }}
          />

          {/* Button */}
          <Box sx={{ mt: 2 }}>
            <Skeleton
              variant="rectangular"
              width={160}
              height={40}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductsSkeleton;
