import React, { Component } from "react";
import PresentationInfo from "../../view/settings/PresentationInfo";

class PresentationInfoController extends Component {
    constructor(props) {
        super(props);
        this.docProps = this.getDocProps();
        this.getModified = this.getModified();
        this.getModifiedBy = this.getModifiedBy();
        this.getCreators = this.getCreators();
        this.title = this.getTitle();
        this.subject = this.getSubject();
        this.description = this.getDescription();
        this.getCreated = this.getCreated();
    }

    getDocProps() {
        const api = Common.EditorApi.get();
        return api.asc_getCoreProps();
    }

    getAppProps() {
        const api = Common.EditorApi.get();
        const appProps = api.asc_getAppProps();

        if (appProps) {
            return `${!appProps.asc_getApplication() ? '' : appProps.asc_getApplication() + ' ' + appProps.asc_getAppVersion()}`;
        }
    }

    getModified() {
        let valueModified = this.docProps.asc_getModified();
        // const _lang = this.props.storeAppOptions.lang;

        if (valueModified) {
            return (
                valueModified.toLocaleString("en", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }) +
                " " +
                valueModified.toLocaleTimeString("en", { timeStyle: "short" })
            );
        }
    }

    getModifiedBy() {
        let valueModifiedBy = this.docProps.asc_getLastModifiedBy();

        if (valueModifiedBy) {
            return Common.Utils.UserInfoParser.getParsedName(valueModifiedBy);
        }
    }

    getCreators() {
        return this.docProps.asc_getCreator();
    }

    getTitle() {
        return this.docProps.asc_getTitle();
    }

    getSubject() {
        return this.docProps.asc_getSubject();
    }

    getDescription() {
        return this.docProps.asc_getDescription();
    }

    getCreated() {
        let value = this.docProps.asc_getCreated();

        if(value) {
            return value.toLocaleString("en", {year: 'numeric', month: '2-digit', day: '2-digit'}) + ' ' + value.toLocaleTimeString("en", {timeStyle: 'short'});
        }
    }

    render() {
        return (
            <PresentationInfo
                getAppProps={this.getAppProps}
                getModified={this.getModified}
                getModifiedBy={this.getModifiedBy}
                getCreators={this.getCreators}
                getCreated={this.getCreated}
                title={this.title}
                subject={this.subject}
                description={this.description}
            />
        );
    }
}


export default PresentationInfoController;