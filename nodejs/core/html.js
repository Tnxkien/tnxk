// Gọi admin
const admin = require('./admin');

class html extends admin
{
    html_form_product(array=[])
    {
        var str='';

        array.forEach(e => {
            // xét thuộc loại element nào
            if(e.element == 'input')
            {
                str += this.input(e.type, e.name, e.class, e.id, e.value, e.placeholder, e.event_changeToSlug);
            }
            else if(e.element == 'select')
            {
                str += this.select(e.arr_option, e.name, e.class, e.id, e.value, e.placeholder);
            }
            else if(e.element == 'textarea')
            {
                str += this.textarea(e.name, e.class, e.id, e.value, e.placeholder, e.rows, e.ckeditor);
            }
        });

        return str;
    }

    pagination(sumPage, currentPage)
    {
        var str='<div class="dataTables_paginate paging_simple_numbers" id="datatable_paginate">';
            str+='<ul class="pagination">';
                str+='<li><a href="admin/product/index/1">First</a></li>';
                str+='<li><a href="admin/product/index/'+ (currentPage-1) +'">Previous</a></li>';
                for (let index = 1; index < sumPage; index++) {
                    str+='<li><a href="admin/product/index/'+ index +'">'+ index +'</a></li>';
                }
                str+='<li><a href="admin/product/index/'+ (currentPage+1) +'">Next</a></li>';
                str+='<li><a href="admin/product/index/'+ (sumPage-1) +'">Last</a></li>';
            str+='</ul>';
        str+='</div>';

        return str;
    }
}

module.exports = html;