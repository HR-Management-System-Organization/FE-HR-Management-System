import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function GuestHomepage() {
  return (
    <CoverLayout image={bgImage}>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="success"
        mx={2.5}
        mt={2}
        p={4}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Welcome
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          Enter your username and password to sign in
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3} textAlign="center">
        <form>
          <MDBox mb={2}>
            <MDInput type="text" name="username" placeholder="Username" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="password" name="password" placeholder="Password" fullWidth />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              Sign in
            </MDButton>
          </MDBox>
        </form>
      </MDBox>
    </CoverLayout>
  );
}

export default GuestHomepage;
