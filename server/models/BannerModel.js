import mongoose from "mongoose";

const schema_banner = new mongoose.Schema(
    {
        // 1 link la 1 chuong trinh quang cao gom 6 banner 0,1,2,3,4,5
        // banner 0,1,2,3 dat o trang chu (0:ben trai; 1,2,3: ben phai)
        // banner 4,5 dat o trang chi tiet san pham (4,5 tu dong thay doi lien tuc)
        link:[
            {
                link_img:{
                    type:String,
                    default:"NULL",
                },
                link_product:{
                    type:String,
                    default:"NULL",
                },
            }
        ],
        state:{
            type:Number, // 0: off, 1: on
            default:0,
        }
    }
)

export const BannerModel = mongoose.model("Banner",schema_banner)