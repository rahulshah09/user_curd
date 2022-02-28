export interface UserModel{

    user_id?: string;
    user_first_name: string;
    user_last_name: string;
    user_organization_name: string;
    user_email: string;
    user_photo?: any;
    user_created_date?: Date;
    user_created_by: string;
    user_updated_date?: any;
    user_updated_by?: any;
    user_status: boolean;
    user_confirmation_date?: any;
    user_confirmation_status: boolean;
    user_freeze: boolean;

}