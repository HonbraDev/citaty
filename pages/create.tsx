import {
  Typography,
  Autocomplete,
  TextField,
  Box,
  InputAdornment,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import Head from "next/head";
import pageTitle from "../src/pageTitle";
import type { GetStaticProps } from "next";
import getPeople from "../src/database/getPeople";
import { Person } from "../src/types";
import { useRouter } from "next/router";

type PrivatePerson = {
  id: Person["id"];
  legalName: Person["legalName"];
};

export default function Create({
  people,
  peopleObject,
}: {
  people: PrivatePerson[];
  peopleObject: Record<string, PrivatePerson>;
}) {
  const router = useRouter();
  

  return (
    <>
      <Head>
        <title>Vytvořit citát - {pageTitle}</title>
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        Vytvořit citát
      </Typography>

      <Formik
        initialValues={{
          text: "",
          personId: "",
          year: new Date().getFullYear().toString(),
        }}
        onSubmit={async (data) => {
          const fetched = await fetch("/api/create", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })

          if (!fetched.ok) return console.error(await fetched.json());

          const id = await fetched.text();

          await router.push(`/quote/${id}`);
        }}
        validate={(values) => {
          const errors: Partial<Record<keyof typeof values, boolean>> = {};

          if (values.text.length === 0) errors["text"] = true;
          if (!Object.keys(peopleObject).includes(values.personId))
            errors["personId"] = true;
          if (isNaN(parseInt(values.year))) errors["year"] = true;
          const parsedYear = parseInt(values.year);
          if (parsedYear > new Date().getFullYear()) errors["year"] = true;
          if (parsedYear < 2020) errors["year"] = true;

          return errors;
        }}
      >
        {({ handleSubmit, values, handleChange, errors, isSubmitting }) => (
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingY: 2,
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">"</InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">"</InputAdornment>,
              }}
              placeholder="Tele je mládě kozy!"
              name="text"
              value={values.text}
              onChange={handleChange}
              variant="outlined"
              label="Citát"
              required
              error={Boolean(errors.text)}
              autoFocus
              disabled={isSubmitting}
            />

            <Autocomplete
              options={people}
              autoHighlight
              getOptionLabel={(option) => option.legalName}
              value={peopleObject[values.personId] || null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_event, newValue) => {
                handleChange({
                  target: {
                    value: newValue ? newValue.id : "",
                    name: "personId",
                  },
                });
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.legalName}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Autor"
                  required
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={Boolean(errors.personId)}
                  disabled={isSubmitting}
                />
              )}
            />

            <TextField
              name="year"
              value={values.year}
              onChange={handleChange}
              variant="outlined"
              label="Rok"
              required
              error={Boolean(errors.year)}
              disabled={isSubmitting}
            />

            <Box sx={{ width: "100%" }}>
              <Button
                type="submit"
                sx={{
                  marginLeft: "auto" /* frick you Safari */,
                  display: "block",
                }}
                disabled={isSubmitting}
              >
                Vytvořit
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const peopleFull = await getPeople();

  if (!peopleFull) throw "People is null ._.";

  const people = peopleFull!.map(({ id, legalName }) => ({ id, legalName }));

  const peopleObject: Record<string, PrivatePerson> = {};

  for (const person of people!) peopleObject[person.id] = person;

  return {
    props: {
      people,
      peopleObject,
    },
    revalidate: 30,
  };
};
