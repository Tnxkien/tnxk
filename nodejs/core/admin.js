class admin
{
    constructor(url='', originalUrl=''){
        this.url = url;
        this.originalUrl = originalUrl;
    }

    get_name_module(){
        return this.originalUrl.split('/')[2];
    }

    sidebar_menu(){
        var array = [
           
            {'name': 'Sản phẩm', 'icon': 'edit', 'link': 'product'},
       
            {'name': 'Đơn Hàng', 'icon': 'star', 'link': 'orders'},
            {'name': 'Thành viên', 'icon': 'users', 'link': 'user'}

        ];

        var str='';

        str+='<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">';
        str+='<div class="menu_section">';
        str+='<h3>Danh mục chung</h3>';
        str+='<ul class="nav side-menu">';

        array.forEach(e => {
            str+=`<li><a href="`+ this.url + `admin/` + e.link +`/index">
                <i class="fa fa-`+ e.icon +`"></i> `+ e.name +` 
            </a></li>`;
        });

        str+='</ul>';
        str+='</div>';
        str+='</div>';

        return str;
    }

    link_convert_name()
    {
        var str='';

        switch( this.get_name_module() )
        {
            case 'product': str='Sản phẩm'; break;
            case 'category': str='Danh mục'; break;
            case 'user': str='Thành viên'; break;
            case 'orders': str='Đơn Hàng'; break;
            
            default: str='No Name'; break;
        }

        return str;
    }

    input(
        _type='text',
        _name='',
        _class='',
        _id='',
        _value='',
        _placeholder='',
        _event_changeToSlug=false,
        _required=false,
        _disabled=false
    )
    {
        var s_required, s_disabled, s_event_changeToSlug;

        s_required = (_required==true) ? 'required' : '';
        s_disabled = (_disabled==true) ? 'disabled' : '';

        s_event_changeToSlug = (_event_changeToSlug==true)
        ? ` onchange="changeToSlug()" 
            onkeydown="changeToSlug()"
            onkeyup="changeToSlug()" ` : '';

        return `<div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="`+ _id +`">
                `+ this.field_convert_name(_name) +`
            </label>
            <div class="col-md-6 col-sm-6">
                <input 
                    type="`+ _type +`" 
                    name="`+ _name +`" 
                    class="form-control `+ _class +`" 
                    id="`+ _id + `" 
                    value="`+ _value +`" 
                    placeholder="`+ _placeholder +`" 
                    `+ s_event_changeToSlug +` 
                    `+ s_required +` 
                    `+ s_disabled +` >
                <span class="error error_`+ _id +`"></span>
            </div>
        </div>`;
    }

    select(
        _array=[],
        _name='',
        _class='',
        _id='',
        _required=false,
        _disabled=false
    )
    {
        var s_required, s_disabled, s_option='';

        s_required = (_required==true) ? 'required' : '';
        s_disabled = (_disabled==true) ? 'disabled' : '';

        _array.forEach(e => {
            s_option += '<option value="'+ e.value +'">' + e.name + '</option>';
        });

        return `<div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="`+ _id +`">
                `+ this.field_convert_name(_name) +`
            </label>
            <div class="col-md-6 col-sm-6">
                <select 
                    name="`+ _name +`"
                    class="form-control `+ _class +`" 
                    id="`+ _id +`" 
                    `+ s_required +` 
                    `+ s_disabled +`>
                    <option value="">-Chọn-</option>
                    `+ s_option +`
                </select>
            </div>
        </div>`;
    }

    textarea(
        _name='', 
        _class='', 
        _id='', 
        _value='',
        _placeholder='',
        _rows=3,
        _ckeditor=false,
        _required=false,
        _disabled=false
    )
    {
        var s_required, s_disabled, s_ckeditor;

        s_required = (_required==true) ? 'required' : '';
        s_disabled = (_disabled==true) ? 'disabled' : '';
        s_ckeditor = (_ckeditor==true) ? 
        "<script>CKEDITOR.replace('"+ _id +"');</script>" : "";

        return `<div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="`+ _id +`">
                `+ this.field_convert_name(_name) +`
            </label>
            <div class="col-md-6 col-sm-6">
                <textarea
                    name="`+ _name +`"
                    class="form-control `+ _class +`" 
                    id="`+ _id +`" 
                    rows="`+ _rows +`" 
                    placeholder="`+ _placeholder +`" 
                    `+ s_required +` 
                    `+ s_disabled +`>`+ _value +`</textarea>
                    `+ s_ckeditor +`
            </div>
        </div>`;
    }

    field_convert_name(field='')
    {
        var str='';

        switch( field )
        {
            case 'name': str='Tên'; break;
            case '_price': str='Giá Tiền'; break;
            case 'slug': str='Slug'; break;
            case 'id_parent': str='Cha'; break;
            case 'content': str='Nội Dung'; break;
            
            default: str='No Name'; break;
        }

        return str;
    }

    ChangeToSlug(title='')
    {
        var slug;
    
        //Đổi chữ hoa thành chữ thường
        slug = title.toLowerCase();
    
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        //In slug ra textbox có id “slug”
        return slug;
    }

    dequy(array=[], id=null)
    {
        var json=[];

        array.forEach(e => {
            if(e.parent == id){
                json.push({
                  name: e.name,
                  slug: e.slug,
                  childs: this.dequy(array, e._id)
                })
            }
        });

        return json;
    }
}

module.exports = admin;