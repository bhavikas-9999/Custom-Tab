$(document).ready(function() {
    let tabCount = 1;
    function addTab() {
        const tabTitle = `New Tab`;
        const $newTab = $(`
            <li class="tab">
                <div class="tab-header">
                    <span class="tab-title">${tabTitle}</span>
                    <button class="close-tab-btn">x</button>
                </div>
                <input type="text" class="input-url" placeholder="Enter URL">
            </li>
        `);

        $('.tabs-list').append($newTab);

        $('.tabs-list li').removeClass('active-tab');
        $newTab.addClass('active-tab');

        const $newIframe = $('<iframe class="tab-iframe" src="about:blank"></iframe>');
        $('.tabs-content').append($newIframe);
        tabCount++;
        switchTab($newTab);
    }

    function switchTab($tab) {
        $('.tabs-list li').removeClass('active-tab');
        $tab.addClass('active-tab');

        const index = $tab.index();
        $('.tab-iframe').hide().eq(index).show();

        const $input = $tab.find('.input-url');
        const inputVal = $input.val();
        const iframeSrc = $tab.data('iframeSrc') || inputVal;

        if (iframeSrc && iframeSrc !== $input.val()) {
            $input.val(iframeSrc);
        }
    }

    $('#addTabBtn').on('click', addTab);

    $('.tabs-list').on('click', 'li', function() {
        switchTab($(this));
    });

    $('.tabs-list').on('click', '.close-tab-btn', function(e) {
        e.stopPropagation();
        const $tab = $(this).closest('.tab');
        const index = $tab.index();

        $tab.remove();
        $('.tab-iframe').eq(index).remove();

        if ($tab.hasClass('active-tab') && $('.tabs-list li').length > 0) {
            switchTab($('.tabs-list li').first());
        }
    });

    $('.tabs-list').on('keyup', '.input-url', function(e) {
        if (e.key === 'Enter') {
            const $input = $(this);
            const $tab = $input.closest('.tab');
            const index = $tab.index();
            const newSrc = $input.val();

            const $iframe = $('.tab-iframe').eq(index);
            $iframe.attr('src', newSrc);
            resizeIframe($iframe[0]);

            $tab.data('iframeSrc', newSrc);
        }
    });

    addTab();
});
