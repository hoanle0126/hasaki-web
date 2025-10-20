import React from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { Icon } from "@iconify/react";
import GeneralTab from "./components/GeneralTab";
import AdvancedTab from "./components/AdvancedTab";
import ImageThumbnail from "@/components/ImageThumbnail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllCategories,
  getCategoriesChildren,
} from "@/store/categories/action";
import { MuiTheme } from "@/theme";
import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import CustomTabPanel from "@/components/tabPanel";
import { getAllBrands } from "@/store/brands/action";
import { addProduct } from "@/store/products/action";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("1");
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState({
    images: [],
    ingredient: {},
    sales: null,
    parameters: {
      Parameter: {
        Barcode: [null],
        "Thương hiệu": [null],
        "Xuất xứ thương hiệu": [null],
        "Nơi sản xuất": [null],
        "Loại da": [null],
        "Dung Tích": [null],
      },
    },
  });
  const categoriesReducer = useSelector((store) => store.categories);
  const categories = categoriesReducer.categoriesChildren;
  const { brands } = useSelector((store) => store.brands);
  console.log(categories);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  React.useEffect(() => {
    dispatch(getCategoriesChildren());
    dispatch(getAllBrands({onSuccess: () => {}}));
  }, []);

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    // navigate("/admin/products");
    console.log("product", product);
  };

  return (
    <AdminDefaultLayout title={"Create new product"}>
      <Grid container spacing={"28px"} sx={{ paddingBottom: "12px" }}>
        <Grid size={3}>
          <Stack gap={"28px"}>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "40px",
              }}
            >
              <Typography variant="h6">Thumbnail</Typography>
              <ImageThumbnail
                src={product.thumbnail}
                setSrc={(src) =>
                  setProduct({
                    ...product,
                    thumbnail: src,
                  })
                }
              />
              <Typography
                variant="captiontext"
                color={"text.disabled"}
                width={"90%"}
              >
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                image files are accepted
              </Typography>
            </Box>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "40px",
              }}
            >
              <Typography variant="h6">Category</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" color="custom">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Number(product?.categories_id)}
                  label="Categories"
                  color="custom"
                  onChange={(e) =>
                    setProduct({ ...product, categories_id: e.target.value })
                  }
                >
                  {categories
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((category, index) => (
                      <MenuItem value={category.id} key={index}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          gap={"8px"}
                        >
                          <img
                            src={category.thumbnail}
                            alt=""
                            className="w-[16px] h-[16px]"
                          />
                          {category.name}
                        </Stack>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color="inherit"
                // onClick={() => router.get(route("categories.create"))}
              >
                Create new category
              </Button>
            </Box>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "40px",
              }}
            >
              <Typography variant="h6">Brand</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" color="custom">
                  Brands
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Number(product?.brand_id)}
                  label="Categories"
                  color="custom"
                  onChange={(e) =>
                    setProduct({ ...product, brand_id: e.target.value })
                  }
                >
                  {brands?.map((brand, index) => (
                    <MenuItem value={brand.id} key={index}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"8px"}
                      >
                        <img
                          src={brand.thumbnail}
                          alt=""
                          className="w-[16px] h-[16px]"
                        />
                        {brand.name}
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color="inherit"
                // onClick={() => router.get(route("categories.create"))}
              >
                Create new brand
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid size={9}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "primary.lighter",
            }}
          >
            <Tabs
              value={tab}
              onChange={handleTab}
              sx={{
                "& .MuiButtonBase-root.MuiTab-root": {
                  textTransform: "none",
                  fontStyle: MuiTheme().typography.subtitle2,
                },
              }}
            >
              <Tab label="General" value="1" />
              <Tab label="Advanced" value="2" />
            </Tabs>
          </Box>
          <CustomTabPanel tab={tab} index={1}>
            <GeneralTab product={product} setProduct={setProduct} />
          </CustomTabPanel>
          <CustomTabPanel tab={tab} index={2}>
            <AdvancedTab product={product} setProduct={setProduct} />
          </CustomTabPanel>
          <Stack
            sx={{
              flexFlow: "row",
              flexDirection: "row",
              justifyContent: "right",
              position: "sticky",
              bottom: 24,
              marginTop: "24px",
            }}
          >
            <Button
              variant="contained"
              color="common"
              sx={{ boxShadow: "main.z1" }}
              endIcon={<Icon icon="eva:save-fill" />}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </AdminDefaultLayout>
  );
};

export default AddProductPage;
