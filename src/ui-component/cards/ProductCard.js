import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import { ADD_PRODUCTS, SNACKBAR_OPEN } from 'store/actions';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ id, color, name, image, description, offerPrice, salePrice, rating }) => {
    const dispatch = useDispatch();

    const prodProfile = image && prodImage(`./${image}`).default;
    const [productRating] = useState(rating);

    const addCart = () => {
        dispatch({
            type: ADD_PRODUCTS,
            product: { id, name, image, salePrice, offerPrice, color, size: 8, quantity: 1 }
        });
        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: 'Add To Cart Success',
            variant: 'alert',
            alertSeverity: 'success'
        });
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonProductPlaceholder />
            ) : (
                <MainCard
                    content={false}
                    boxShadow
                    sx={{
                        '&:hover': {
                            transform: 'scale3d(1.02, 1.02, 1)',
                            transition: 'all .4s ease-in-out'
                        }
                    }}
                >
                    <CardMedia
                        sx={{ height: 220 }}
                        image={prodProfile}
                        title="Contemplative Reptile"
                        component={Link}
                        to={`/e-commerce/product-details/${id}`}
                    />
                    <CardContent sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    component={Link}
                                    to={`/e-commerce/product-details/${id}`}
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    {name}
                                </Typography>
                            </Grid>
                            {description && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            height: 45
                                        }}
                                    >
                                        {description}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={12} sx={{ pt: '8px !important' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Rating precision={0.5} name="size-small" value={productRating} size="small" readOnly />
                                    <Typography variant="caption">({offerPrice}+)</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Typography variant="h4">${offerPrice}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ color: 'grey.500', textDecoration: 'line-through' }}>
                                                ${salePrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button variant="contained" sx={{ minWidth: 0 }} onClick={addCart}>
                                        <ShoppingCartTwoToneIcon fontSize="small" />
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    offerPrice: PropTypes.number,
    salePrice: PropTypes.number,
    rating: PropTypes.number
};

export default ProductCard;
