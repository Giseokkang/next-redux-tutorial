import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";
import helmet, {
  HelmetData,
  HelmetDatum,
  HelmetHTMLBodyDatum,
  HelmetHTMLElementDatum
} from "react-helmet";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: any) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, helmet: helmet.renderStatic(), styleTags };
  }

  render() {
    const { ...helmet } = this.props.helmet;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
          {Object.values(helmet).map(
            (
              el: HelmetDatum | HelmetHTMLBodyDatum | HelmetHTMLElementDatum
            ) => {
              el.toComponent();
            }
          )}
        </Head>
        <body {...bodyAttrs}>
          <Main />
          {process.env.NODE_ENV === "production" && (
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
          )}
          <NextScript />
        </body>
      </html>
    );
  }
}
