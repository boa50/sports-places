from fastapi import Response
import pandas as pd


def get_df_response(df: pd.DataFrame):
    return Response(df.to_json(orient="records"), media_type="application/json")
