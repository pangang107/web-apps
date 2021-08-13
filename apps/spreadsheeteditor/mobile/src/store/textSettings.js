import {action, observable, makeObservable, computed} from 'mobx';

export class storeTextSettings {
    constructor() {
        makeObservable(this, {
            fontsArray: observable,
            fontInfo: observable,
            fontName: observable,
            arrayRecentFonts:observable,
            fontSize: observable,
            isBold: observable,
            isItalic: observable,
            isUnderline: observable,
            textColor: observable,
            customTextColors: observable,
            paragraphAlign: observable,
            paragraphValign: observable,
            textIn: observable,
            resetFontsRecent:action,
            initTextSettings: action,
            initFontSettings: action,
            initEditorFonts: action,
            initFontInfo: action,
            changeTextColor: action,
            changeCustomTextColors: action,
            addFontToRecent:action
        });
    }
    
    fontsArray = [];
    arrayRecentFonts = [];
    fontInfo = {};
    fontName = '';
    fontSize = undefined;
    isBold = false;
    isItalic = false;
    isUnderline = false;
    textColor = undefined;
    customTextColors = [];
    paragraphAlign = undefined;
    paragraphValign = undefined;
    textIn = undefined;

    initTextSettings(cellInfo) {
        let xfs = cellInfo.asc_getXfs();
        let selectType = cellInfo.asc_getSelectionType();

        switch (selectType) {
            case Asc.c_oAscSelectionType.RangeChartText: this.textIn = 1; break;
            case Asc.c_oAscSelectionType.RangeShapeText: this.textIn = 2; break;
            default: this.textIn = 0;
        }

        this.initFontSettings(xfs);
    }

    initFontSettings(xfs) {
        this.fontName = xfs.asc_getFontName();
        this.fontSize = xfs.asc_getFontSize();

        this.isBold = xfs.asc_getFontBold();
        this.isItalic = xfs.asc_getFontItalic();
        this.isUnderline = xfs.asc_getFontUnderline();
    
        let color = xfs.asc_getFontColor();
        // console.log(color);
        this.textColor = this.resetTextColor(color);

        this.paragraphAlign = xfs.asc_getHorAlign();
        this.paragraphValign = xfs.asc_getVertAlign();
    }

    initEditorFonts (fonts, select) {
        let array = [];
        for (let font of fonts) {
            let fontId = font.asc_getFontId();
            array.push({
                id          : fontId,
                name        : font.asc_getFontName(),
                //displayValue: font.asc_getFontName(),
                imgidx      : font.asc_getFontThumbnail(),
                type        : font.asc_getFontType()
            });
        }

        array.sort(function(a, b) {
            return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
        });

        this.fontsArray = array;
    }

    initFontInfo(fontObj) {
        this.fontInfo = fontObj;
    }

    addFontToRecent (font) {
        this.arrayRecentFonts.forEach(item => {
            if (item === font) this.arrayRecentFonts.splice(this.arrayRecentFonts.indexOf(item),1);
        })
        this.arrayRecentFonts.unshift(font);

        if (this.arrayRecentFonts.length > 5) this.arrayRecentFonts.splice(4,1);
    }

    changeTextColor(value) {
        this.textColor = value;
    }

    resetTextColor (color) {
        let value;

        if (color) {
            if (color.get_auto()) {
                value = 'auto';
            } else {
                if (color.get_type() == Asc.c_oAscColor.COLOR_TYPE_SCHEME) {
                    value = {
                        color: Common.Utils.ThemeColor.getHexColor(color.get_r(), color.get_g(), color.get_b()),
                        effectValue: color.get_value()
                    }
                } else {
                    value = Common.Utils.ThemeColor.getHexColor(color.get_r(), color.get_g(), color.get_b());
                }
            }
        }

        return value;
    }

    resetFontsRecent(fonts) {
        this.arrayRecentFonts = fonts;
        this.arrayRecentFonts = this.arrayRecentFonts ? this.arrayRecentFonts.split(';') : [];
    }

    changeCustomTextColors (colors) {
        this.customTextColors = colors;
    }
}